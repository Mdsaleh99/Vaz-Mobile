"use client"

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/uitls/Categories";
import { colors } from "@/uitls/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import axios from "axios";
import { useRouter } from "next/navigation";


export type ImageType = {
    color: string,
    colorCode: string,
    image: File | null
}
export type UploadedImageType = {
    color: string,
    colorCode: string,
    image: string
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)

    const router = useRouter()

    // console.log('images>>>>>>', images);
    

    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "", 
            price: "", 
            brand: "", 
            category: "", 
            inStock: false, 
            images: []
        }
    })

    useEffect(() => {
        setCustomValue('images', images)
    }, [images])

    useEffect(() => {
        if(isProductCreated){
            reset()
            setImages(null)
            setIsProductCreated(false)
        }
    }, [isProductCreated])
    

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        console.log("product data", data);
        // upload the images to firebase
        // save product to mongodb
        setIsLoading(true)
        let uploadedImages: UploadedImageType[] = []

        if(!data.category){
            setIsLoading(false)
            return toast.error("Category is not selected")
        }

        if(!data.images || data.images.length === 0){
            setIsLoading(false)
            return toast.error("No selected Image")
        }

        const handleImageUploads = async() => {
            toast("Creating product, please wait....")
            try {
                for(const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime() + "-" + item.image.name
                        const storage = getStorage(firebaseApp)
                        const stroageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(stroageRef, item.image)

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error) => {
                                    console.log("Error while uploading image", error);         
                                    reject(error)
                                },
                                () => {
                                    // Handle successful uploads on complete
                                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                      console.log('File available at', downloadURL);
                                      resolve()
                                    }).catch((error) => {
                                        console.log("Error getting the download URL");
                                        
                                        reject(error)
                                    })
                                  } 
                            )
                        })
                    }
                }
            } catch (error) {
                setIsLoading(false)
                console.log("Error handling image uploads", error);
                return toast.error("Error handling image uploads")
            }
        }


        await handleImageUploads()
        const productData = {...data, images: uploadedImages}
        // console.log(productData);
        
        axios.post('/api/product', productData).then(() => {
            toast.success("Product created")
            setIsProductCreated(true)
            router.refresh()
        }).catch((error) => {
            toast.error("Something went wrong when saving product to db")

        }).finally(() => {
            setIsLoading(false)
        })
    } 

    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {shouldValidate: true, shouldDirty: true, shouldTouch: true});
    }


    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(!prev){
                return [value]
            }

            return [...prev, value]
        })
    }, [])


    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(prev){
                const filteredImages = prev.filter((item) => item.color !== value.color)
                return filteredImages
            }

            return prev
        })
    }, [])

    return ( 
        <>
            <Heading title="Add a Product" center />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="price" label="Price" type="number" disabled={isLoading} register={register} errors={errors} required />
            <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required />
            <TextArea id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
            <CustomCheckBox id="inStock" register={register} label="This product is in Stock" />
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Select Category</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                    {
                        categories.map((item) => {
                            if(item.label === "All"){
                                return null
                            }

                            return (
                                <div key={item.label} className="col-span">
                                    <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-full flex mt-4 flex-col flex-wrap gap-4">
                    <div>
                        <div className="font-bold">
                            Select the available product color and upload there images
                        </div>
                        <div className="text-sm">
                            You must upload an image for each of the color selected otherwise your color selection will be ignored
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {
                            colors.map((item, index) => {
                                return (
                                    <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Button label={isLoading ? 'Loading.....' : 'Add Product'} onClick={handleSubmit(onSubmit)} />
        </>
    );
}
 
export default AddProductForm;
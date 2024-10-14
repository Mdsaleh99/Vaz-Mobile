interface ContainerProps {
    children: React.ReactNode
    // Represents all of the things React can render.
    // Where ReactElement only represents JSX, ReactNode represents everything that can be rendered.
}

const Container: React.FC<ContainerProps> = ({children}) => {
    // FC: Represents the type of a function component. Can optionally receive a type argument that represents the props the component receives.
    return ( 
        <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4">
            {children}
        </div>
    );
}
 
export default Container;

/*
1. The Interface ContainerProps

interface ContainerProps: This defines the shape or structure of the properties (props) that the Container component will receive.
children: React.ReactNode:
children is a special prop in React that refers to whatever content you put inside a component when you use it (like text, other components, etc.).
React.ReactNode: This is a type that can represent anything React can render, like JSX elements, strings, numbers, or even null or undefined. It’s very flexible and covers all possible things you can render in React.



2. The Container Functional Component

const Container: This is declaring a constant named Container which is a functional component.
: React.FC<ContainerProps>:
React.FC stands for React Function Component. It tells TypeScript that Container is a function component that follows React’s conventions.
<ContainerProps>: This means that Container expects props (properties) that match the structure defined by ContainerProps (in this case, just a children prop).
({ children }): This is destructuring the children prop from the props object. This allows you to easily access children inside the function.


4. {children}
This is where the children prop gets rendered. Whatever is passed between the opening and closing tags of the Container component will be displayed inside this div.


How It Works:
You can wrap content inside the Container component, and it will automatically apply a maximum width and responsive padding.
*/
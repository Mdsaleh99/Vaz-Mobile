interface FooterListProps {
    children: React.ReactNode
}

const FooterList: React.FC<FooterListProps> = ({children}) => {
    return ( 
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-2">
            {children}
        </div>
    );
}
 
export default FooterList;
/*

On smaller screens (like phones or tablets), users benefit from larger, easy-to-read elements that take up more of the screen width (hence w-full or w-1/2).
On larger screens (like desktops), users often want to see more content at once, so reducing the element's width allows multiple elements to sit side by side, providing a more efficient use of space.
How it Works in Your Case:
On extra-small screens (like phones):

w-full means the element takes the full width of the screen (100%), which is common on mobile devices to make the best use of limited space.
On small screens (like tablets):

w-1/2 means the element takes up 50% of the width, which allows two elements to sit side by side on small screens, improving readability while still making good use of the space.
On medium screens (like smaller laptops):

w-1/4 means the element takes 25% of the screen width, allowing four elements to fit in a row, making better use of the larger space.
On large screens (like desktops):

w-1/6 means the element takes just 16.67% of the screen width, allowing six elements to fit side by side. Since there is much more space available on large screens, reducing the width creates a compact, organized layout without wasted space.

*/
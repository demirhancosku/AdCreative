import React, {useEffect, useRef} from 'react';
import debounce from 'lodash/debounce';
import DropdownComponent from "./Dropdown.component";
import {useMultiSelectContext} from "./contex";
import Loading from "./ui-states/loading";
import Error from "./ui-states/error";
import {CharacterRefs} from "./types";
import Notfound from "./ui-states/notfound";


const MultiSelectComponent = () => {
    // Use multi-select context
    const {
        selectedItems,
        setSelectedItems,
        searchTerm,
        setSearchTerm,
        setIsOpen,
        handleKeyDown
    } = useMultiSelectContext();

    // Create a ref to a div element and a ref to store selected items
    const wrapperRef = useRef<HTMLDivElement>(null);
    const selectedItemRefs = useRef<CharacterRefs>({});

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the searchTerm state with the value of the input field
        setSearchTerm(event.target.value);
    };

    // Create a debounced version of the handleSearchChange function with a delay of 300 milliseconds
    const debouncedChangeHandler = debounce(handleSearchChange, 300);

    // Define a function to handle the removal of an item from the selected items
    // TODO: it can be moved under context
    const handleRemoveItem = (item: string) => {
        // Filter out the item being removed and update the selectedItems state
        setSelectedItems(selectedItems.filter(i => i !== item));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside the wrapperRef, and searchTerm is a single character
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node) && searchTerm.length === 1) {
                setIsOpen(false);
            }
        };

        // Add a click event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, searchTerm, setIsOpen]);


    return (
        <div className="wrapper">
            <div ref={wrapperRef} className="multi-select-container">
                <div className="search-input-container">
                    {selectedItems.map(item => (
                            <div key={item}
                                 className="search-tag"
                                 tabIndex={0}
                                 ref={el => {
                                     selectedItemRefs.current[item] = el
                                 }}
                                 onKeyDown={(e) => handleKeyDown(e, item, selectedItemRefs)}>
                                {item}
                                <span onClick={() => handleRemoveItem(item)}>×</span>
                            </div>
                        )
                    )}
                    <input type="text"
                           onChange={debouncedChangeHandler}
                           placeholder="Search..."
                           onFocus={() => setIsOpen(true)}
                           className="search-input"/>
                </div>
                <Error/>
                <Loading/>
                <Notfound/>
                <DropdownComponent/>
            </div>
        </div>
    );
};

export default MultiSelectComponent;

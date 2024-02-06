import React, {useRef} from "react";
import {Character, CharacterRefs} from "./types";
import {useMultiSelectContext} from "./contex";

const highlightText = (text: string, highlight: string) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
      {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? <strong key={i}>{part}</strong> : part
      )}
    </span>
    );
};


const DropdownComponent = () => {
    const {
        selectedItems,
        setSelectedItems,
        data,
        loading,
        searchTerm,
        isOpen,
        handleKeyDown
    } = useMultiSelectContext();

    const itemRefs = useRef<CharacterRefs>({});

    // Check if the item is already in the selectedItems array
    const handleSelectItem = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    // Check conditions for early return
    if (loading || !isOpen || (!loading && data.length === 0 && searchTerm.length > 0)) {
        return (<></>);
    }

    return (
        <div className="dropdown">
            <div className="dropdown-container">
                {data.map((character: Character) => (
                    <div key={character.id}
                         tabIndex={0}
                         ref={el => itemRefs.current[character.id] = el}
                         onKeyDown={(e) => handleKeyDown(e, character, itemRefs)}
                         className="dropdown-item">
                        <label className="item-label">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(character.name)}
                                onChange={() => handleSelectItem(character.name)}
                                className="item-checkbox"
                            />
                            <img src={character.image} alt={character.name} className="item-image"/>
                            <div className="item-info">
                                <div className="item-name">{highlightText(character.name, searchTerm)}</div>
                                <div className="item-count">{character?.episode.length} Episodes</div>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>)
};

export default DropdownComponent;

import React, {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    MutableRefObject
} from 'react';
import {ApolloError, QueryResult, useQuery} from "@apollo/client";
import {Character, CharacterRefs, CharactersResponse, MultiSelectProviderProps} from "./types";

// Define the type for the context state
interface IMultiSelectContext {
    selectedItems: string[];
    setSelectedItems: Dispatch<SetStateAction<string[]>>;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    data: Character[];
    loading: boolean;
    error: ApolloError | undefined;
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleKeyDown: (event: React.KeyboardEvent, character: Character | string, itemRefs: MutableRefObject<CharacterRefs>) => void
}

// Create the context with a default null value
const MultiSelectContext = createContext<IMultiSelectContext | null>(null);

// Create a custom hook to use the MultiSelect context
export const useMultiSelectContext = () => {
    const context = useContext(MultiSelectContext);
    if (!context) {
        throw new Error('useMultiSelectContext must be used within a MultiSelectProvider');
    }
    return context;
};

export const MultiSelectProvider: React.FC<MultiSelectProviderProps> = ({children, query}) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Apollo query
    const {loading, error, data: _data}: QueryResult<CharactersResponse> = useQuery(query, {
        variables: {name: searchTerm, page: 1}
        // I could have added pagination if I got a little bit more time
    });

    const data = _data?.characters.results || []

    // Keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent, character: Character | string, itemRefs: MutableRefObject<CharacterRefs>) => {
        if (!itemRefs.current) {
            return;
        }
        //TODO: there is a bug when you hit tab on the last selected item
        // expected behavior is focusing first dropdown element

        switch (event.key) {
            case 'Tab':
                event.preventDefault()
                moveFocus(itemRefs, character, 1)
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                moveFocus(itemRefs, character, 1)
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                moveFocus(itemRefs, character, -1)
                break;
            case 'Enter':
            case ' ':
                event.preventDefault()
                toggleItem(character)
                break;
            case 'Escape':
                setIsOpen(false)
                break;
        }
    };

    const toggleItem = (character: Character | string) => {
        let newSelectedItems = [...selectedItems];
        const charName = typeof character === "object" ? character.name : character
        if (!newSelectedItems.includes(charName)) {
            newSelectedItems.push(charName);
        } else {
            newSelectedItems = newSelectedItems.filter(item => item !== charName);
        }
        setSelectedItems(newSelectedItems);
    };

    const moveFocus = (itemRefs: MutableRefObject<CharacterRefs>, character: Character | string, direction: number) => {
        //TODO: refactor this before sending, selectedItems should be array of objects
        // not just string, to be able to navigate between dropdown & selected tags without if blocks

        if(typeof character === "object"){ // if passed char is object then move focus on dropdown
            const index = data.findIndex(item => item.name === character.name);
            if (direction > 0 && index < data.length - 1) {
                itemRefs.current[data[index + 1].id]?.focus();
            } else if (direction < 0 && index > 0) {
                itemRefs.current[data[index - 1].id]?.focus();
            }
        } else {
            const index = selectedItems.findIndex(item => item === character);
            if (direction > 0 && index < data.length - 1) {
                itemRefs.current[selectedItems[index + 1]]?.focus();
            } else if (direction < 0 && index > 0) {
                itemRefs.current[selectedItems[index - 1]]?.focus();
            }
        }
    };

    return (
        <MultiSelectContext.Provider
            value={{
                selectedItems,
                setSelectedItems,
                data,
                loading,
                error,
                searchTerm,
                setSearchTerm,
                isOpen,
                setIsOpen,
                handleKeyDown
            }}>
            {children}
        </MultiSelectContext.Provider>
    );
};

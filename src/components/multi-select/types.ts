import {DocumentNode} from "@apollo/client";
import React from "react";

// single character
export type Character = {
    id: number;
    name: string; // Character's name
    image: string; // URL to the character's image
    episode: any[]
};

// query response for characters
export type CharactersResponse = {
    characters: {
        results: Character[];
        info: {
            count: number;
            pages: number;
            next: number | null;
            prev: number | null;
        };
    };
};

// Props for the MultiSelect component if needed
export type MultiSelectProviderProps = {
    query: DocumentNode
    children: React.ReactNode
};

// Fef object for the characters' DOM elements
export type CharacterRefs = {
    [key: string]: HTMLDivElement | null; // Use the character's id as the key
};

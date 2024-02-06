import React from 'react';
import {useMultiSelectContext} from "../contex";

const Notfound: React.FC = () => {
    const {loading, data, searchTerm} = useMultiSelectContext();

    if (!loading && data.length === 0 && searchTerm.length > 0)
        return (
            <div className="dropdown-item">The character you are looking for was not found</div>
        );

    return (<></>)
};

export default Notfound;
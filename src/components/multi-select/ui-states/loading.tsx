import React from 'react';
import {useMultiSelectContext} from "../contex";

const Loading: React.FC = () => {
    const {loading, searchTerm} = useMultiSelectContext();

    if (loading && searchTerm.length > 0)
        return (
            <div style={{textAlign: 'center', padding: '20px'}}>
                <p>Loading...</p>
            </div>
        );

    return (<></>)
};

export default Loading;
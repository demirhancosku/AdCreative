import React from 'react';
import {useMultiSelectContext} from "../contex";

const ErrorComponent: React.FC = () => {
    const {error} = useMultiSelectContext();

    if(error)
        return (
            <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                <p>Error: {error?.message}</p>
            </div>
        );

    return (<></>)
};

export default ErrorComponent;
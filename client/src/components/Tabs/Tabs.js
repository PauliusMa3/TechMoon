import React, {useState} from 'react';
import {TabsStyles} from './Tabs.styles';


const Tabs = ({children}) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const tabs = children.map((child) => (
        <button
            key={child.props.label}
            className={`tab ${child.props.label === activeTab ? 'active' : ''}`}
            onClick={() => {
                setActiveTab(child.props.label);
            }}
        >
            {child.props.tabName}
        </button>
    ));

    const tabContent = children.filter(child => child.props.label === activeTab);

    return (
        <div>
            <TabsStyles>
                {tabs}
            </TabsStyles>
            <div>{tabContent}</div>
        </div>
    )
}

const Tab = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

export {
    Tabs,
    Tab
}
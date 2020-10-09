import React, { useState } from 'react';
import { useRouter, Router } from 'next/router';
import styled from 'styled-components';

const TabManager = ({ handleTab, tabs, activeTab }) => {
  const router = useRouter();

  const scrollTo = (ref) => {
    if (ref && ref.current) {
      window.scroll({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])
  return (
    <TabManagerStyles>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={`tab ${activeTab === tab.value ? 'selected-tab' : ''}`}
          onClick={() => {
            handleTab(tab.value);
            if (tab.label.startsWith('review')) {
              router.push(
                `${router.asPath}#${tab.label}`,
              );
            } else {
              console.log('tab.ref', tab.ref);
              scrollTo(tab.ref);
            }
          }}
        >
          {tab.label}
        </div>
      ))}
    </TabManagerStyles>
  );
};

export default TabManager;

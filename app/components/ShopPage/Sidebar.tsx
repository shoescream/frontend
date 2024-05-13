import React, { useState } from 'react';
import styled from 'styled-components';

const Sidebar = () => {
    const categories = [
        { title: '카테고리', items: ['상의', '신발', '아우터', '하의', '가방'] },
        { title: '브랜드', items: ['Adidas', 'Nike', 'Asics', 'New Balance'] },
        { title: '사이즈', items: ['230', '240', '250', '260', '270'] },
        { title: '성별', items: ['남성', '여성', '키즈'] }
    ];

    const [expandedItems, setExpandedItems] = useState(new Array(categories.length).fill(false));

    const toggleItem = (index: number) => {
        const newExpandedItems = [...expandedItems];
        newExpandedItems[index] = !newExpandedItems[index];
        setExpandedItems(newExpandedItems);
    };

    return (
        <Aside>
            <div className="filter-container">
                <span className='filter'>필터</span>
                {categories.map((category, index) => (
                    <div className="sidebar-item" key={index}>
                        <div className="categories" onClick={() => toggleItem(index)}>
                            <span className="item-title">{category.title}</span>
                            <img src={expandedItems[index] ? '/sidebarminus.png' : '/sidebarplus.png'} alt="Toggle Icon" className="toggle-icon" />
                        </div>
                        <ul className={`item-list ${expandedItems[index] ? 'expanded' : ''}`}>
                            {category.items.map((item, idx) => (
                                <li className="item-option" key={idx}>
                                    <input type="checkbox" id={`item-${index}-${idx}`} />
                                    <label htmlFor={`item-${index}-${idx}`}>{item}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Aside>
    );
}

export default Sidebar;

const Aside = styled.aside`
    width: 20%;

    .filter-container {
        margin: 2rem; 
        border-radius: 3rem;
        border: solid lightgray 0.1rem;
        text-align: center;
        padding: 1rem 0; 
        overflow: hidden;
    }
    
    .filter {
        font-weight: bold; 
    }
    
    .sidebar-item {
        border-bottom: 0.1rem solid lightgray; 
        overflow: hidden;
    }

    .categories {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        margin: 1rem;
    }

    .item-title {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .toggle-icon {
        width: 2rem;
        height: 2rem;
    }

    .item-list {
        list-style: none;
        margin: 1rem;
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        text-align: left;
    }

    .item-list.expanded {
        max-height: 100rem; 
    }

    .item-option {
        cursor: pointer;
        margin-bottom: 0.5rem;
        color: gray;
    }

    input[type="checkbox"] {
        display: none; /* 기본 체크박스 숨김 */
    }

    input[type="checkbox"] + label {
        display: inline-block;
        cursor: pointer;
    }

    input[type="checkbox"] + label:before {
        content: ''; 
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        border: 0.1rem solid gray;
        border-radius: 0.2rem;
        background-color: white;
        vertical-align: middle;
        margin-right: 1rem;
    }

    input[type="checkbox"]:checked + label:before {
        content: '\\2713'; /* 체크 시 표시할 체크 마크 (✓) */
        text-align: center;
        line-height: 1.6rem;
    }
`;

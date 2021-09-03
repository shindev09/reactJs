import React, { useState } from 'react'
import './SideBar.scss'
import { Collapse, Button, Checkbox } from "antd"

const { Panel } = Collapse
const categoryMenu = (categories, handleCategories) => (
    categories.map((item, index) => (
        <Collapse
            key={index}
            activeKey={item.isActive ? index : ""}
            onChange={() => handleCategories(item)}>
            <Panel header={
                <span
                    style={{ fontWeight: item.isActive ? 500 : 300 }}
                    className="category-list">
                    {item.name}
                </span>}
                key={index}
                forceRender={true}
                destroyInactivePanel={true}
            >{item.children &&
                categoryMenu(item.children, handleCategories)}</Panel>
        </Collapse >
    ))
)


const SideBar = ({ categories, params, setParams, handleCategories, types, brands, setCurrentCategory, setIsVisible, isVisible }) => {
    const [checked, setChecked] = useState(false)

    const handleClearFilter = () => {
        setParams({ _page: 1, _limit: 16 })
        setIsVisible(false);
        setCurrentCategory({})
    }

    const handleCheckType = (e) => {
        if (e.target.checked) {
            setParams({ ...params, q: e.target.value })
            setIsVisible(true);
        } else {
            setParams({ ...params, q: "" });
            setIsVisible(false)
        }
    }


    return (
        <div className="side-bar">
            <Button className="side-bar-clear" style={{
                display: isVisible ? "block" : "none",
            }}
                onClick={() => handleClearFilter()}><i className="fa fa-eraser"></i>Clear all filters</Button>
            <section className="category-product">
                <h3 className="category-title">Show results for</h3>
                {categoryMenu(categories, handleCategories)}
            </section>
            <h3 className="category-title">Refine by</h3>
            <section className="category-product">
                <h2 className="category-title">Types</h2>
                {types.map((value, index) => (
                    <Checkbox
                        key={index}
                        value={value.type}
                        onChange={handleCheckType}
                    >
                        {value.type}({value.quantity})
                    </Checkbox>
                ))}
            </section>
            {/* <section className="category-product">
                <h2 className="category-title">Brands</h2>
                {brands.map((value) => (
                    <div className="side-bar-checkbox">
                        <Checkbox key={value.type}>
                            {value.type}({value.quantity})
                        </Checkbox>
                    </div>
                ))}
            </section> */}
        </div >
    )
}

export default SideBar;
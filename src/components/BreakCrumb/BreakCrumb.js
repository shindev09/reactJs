import React from 'react'
import { Select, Breadcrumb } from 'antd'
import './BreakCrumb.scss'

const { Option } = Select

export default function BreakCrumb({ total, loadTime, handleSortPrice }) {
    return (
        <Breadcrumb separator={null} className="breakcrumb-container">
            <Breadcrumb.Item>
                {total} results found in {loadTime}ms
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>Sort by </span>
                <Select
                    defaultValue="Featured"
                    onChange={(value) => handleSortPrice(value)}
                >
                    <Option value="Featured">Featured</Option>
                    <Option value="asc">Price asc.</Option>
                    <Option value="desc">Price desc.</Option>
                </Select>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

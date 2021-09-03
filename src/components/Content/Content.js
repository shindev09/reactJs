import React from 'react'
import { Card, Row, Col, Pagination, Rate, Spin } from 'antd';
import "./Content.scss"

const { Meta } = Card;

export default function Content({ product, params, setParams, loading, setLoading, total }) {
    return !loading && product.length ? (
        <Row gutter={[8, 8]}>
            {product.map((item) => (
                <Col
                    key={item.objectID}
                    span={6}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                >
                    <Card
                        className="product-item"
                        hoverable
                        cover={
                            <img
                                alt={item.name}
                                src={item.image}
                                className="product-item__img"
                            />
                        }>
                        <Meta title={item.name} className="product-item__name" />
                        <Row gutter={[8, 8]} className="product-item__content">
                            <Col span={18}>
                                <Rate
                                    disabled
                                    value={item.rating}
                                    className="product-item__content-rating"
                                />
                            </Col>
                            <Col span={6} className="product-item__content-price">
                                ${item.price}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
            <Col
                span={24}
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}>
                <Pagination
                    current={params._page}
                    defaultPageSize={params._limit}
                    onShowSizeChange={(current, pageSize) =>
                        setParams({ ...params, _limit: pageSize, _page: current })}
                    pageSizeOptions={[16, 32, 48]}
                    onChange={(current, pageSize) => {
                        setParams({ ...params, _page: current, _limit: pageSize });
                        setLoading(true);
                    }}

                    total={total}
                />
            </Col>
        </Row >
    ) : (
        <div className="loading-product-wrapper">
            <Spin
                tip="Wait minute..."
                className="loading-product"
            />
        </div>

    )
}

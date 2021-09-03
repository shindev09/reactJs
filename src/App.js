import { useEffect, useState } from "react";
import { Breadcrumb, Layout } from "antd";
import 'antd/dist/antd.css';
import productApi from "./api/productApi";
import HeaderMenu from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import Product from "./components/Content/Content"
import BreakCrumb from "./components/BreakCrumb/BreakCrumb"
import { renderCategories } from './utils/renderCategories';

const { Header, Content, Sider } = Layout;

function App() {
    const [product, setProduct] = useState([])
    const [total, setTotal] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({})
    const [params, setParams] = useState({ _page: 1, _limit: 16 })
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadTime, setLoadTime] = useState('')

    useEffect(() => {
        (async function () {
            try {
                const { _page, _limit, ...param } = params
                const responseAll = await productApi.getAll(param);
                const responseLimit = await productApi.getAll(params);
                const time = new Date().getTime();

                setProduct(responseLimit)
                setTotal(responseAll.length)
                setLoadTime(new Date().getTime() - time);
                setCategories(
                    renderCategories(responseAll, categories, currentCategory)
                        .categories,
                );
                setTypes(
                    renderCategories(responseAll, categories, currentCategory)
                        .types,
                );
                setBrands(
                    renderCategories(responseAll, categories, currentCategory)
                        .brands,
                );

                setLoading(false);

            } catch (error) {
                console.log("Error when fetch data :", error);
            }
        }
        )();
    }, [params])

    const handleCategories = (category) => {
        setCurrentCategory(category);
        setParams({ ...params, q: category.name });
        setIsVisible(true);
        if (category.level === 0 && category.isActive) {
            setParams({ ...params, q: "" });
            setIsVisible(false)
        }
    }

    const handleSortPrice = (value) => {
        const { _sort, _order, ...param } = params;
        if (value === 'Featured') {
            setParams({ ...param, _page: 1 });
            setLoading(true);
        } else {
            setParams({ ...params, _order: value, _sort: 'price', _page: 1 });
            setLoading(true);
        }
    }

    return (
        <Layout>
            <Header>
                <HeaderMenu />
            </Header>
            <Layout>
                <Sider>
                    <SideBar
                        categories={categories}
                        setCurrentCategory={setCurrentCategory}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        params={params}
                        setParams={setParams}
                        handleCategories={handleCategories}
                        types={types}
                        setTypes={setTypes}
                        brands={brands}

                    />
                </Sider>
                <Layout className="container-wrapper">
                    <BreakCrumb
                        loadTime={loadTime}
                        total={total}
                        handleSortPrice={handleSortPrice}>
                    </BreakCrumb>
                    <Content>
                        <Product
                            loading={loading}
                            setLoading={setLoading}
                            product={product}
                            params={params}
                            setParams={setParams}
                            total={total}
                        />
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    )
}

export default App;

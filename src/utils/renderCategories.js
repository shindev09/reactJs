export const renderCategories = (responseAll, categories, currentCategory) => {
    const categoryItem = new Set();

    let types = responseAll.reduce((obj, category) => {
        // Hàm dùng chung để get tới level của category
        const categoryLevel = () => {
            return category.hierarchicalCategories
        }
        // Kiểm tra, loại bỏ dấu > có trong data và trim hết những khoảng trắng thừa 
        if (currentCategory.level === 0 && !currentCategory.isActive) {
            const categoryLevelElement = categoryLevel().lvl1?.split('>')[1].trim();

            if (categoryLevelElement) categoryItem.add(categoryLevelElement);
        } else if (currentCategory.level === 1 && !currentCategory.isActive) {
            const categoryLevelElement = categoryLevel().lvl2?.split('>')[2].trim();

            if (categoryLevelElement) categoryItem.add(categoryLevelElement);
        } else {
            categoryItem.add(categoryLevel().lvl0);
        }
        // Kiểm tra obj của type để tránh trùng lặp type
        if (!obj[category.type]) {
            obj[category.type] = 0;
        }
        obj[category.type]++;

        return obj;
    }, {});

    // Cắt lấy 10 item
    let children = [...categoryItem].slice(0, 10);

    // Chuyển types thành array, sử dụng map để lặp rồi lấy ra 5 element đầu tiên từ lớn đến bé
    types = Object.entries(types)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key, value]) => {
            return { type: key, quantity: value, checked: false };
        });

    let brands = responseAll.reduce((obj, category) => {
        // Kiểm tra obj của brand để tránh trùng lặp
        if (!obj[category.brand]) {
            obj[category.brand] = 0;
        }
        obj[category.brand]++;

        return obj;
    }, {});

    brands = Object.entries(brands)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key, value]) => {
            return { type: key, quantity: value, checked: false };
        });

    // Nếu mà Key độ dài của category hiện tại = 0 thì show list level 0
    if (Object.keys(currentCategory).length === 0) {
        categories = children.map((category) => {
            return {
                name: category,
                level: 0,
                isActive: false,
            };
        });
    } else if (currentCategory.level === 0 && children.length) {
        children = children.map((category) => {
            return {
                name: category,
                level: 1,
                isActive: false,
            };
        });

        const indexChange = categories.findIndex((cateItem) =>
            cateItem.name === currentCategory.name, // tim` index cua item dc click
        );

        categories = categories.map((category) => {
            delete category.children;
            return {
                ...category,
                isActive: false,
            };
        });

        categories[indexChange] = {
            ...categories[indexChange],
            children: children,
            isActive: true,
        };

        if (currentCategory.isActive) {
            categories = categories.map((category) => {
                delete category.children;
                return {
                    ...category,
                    isActive: false,
                };
            });
        }
    } else if (currentCategory.level === 1 && children.length) {
        const lvl0Element = categories.findIndex(
            (cateItem) => cateItem.children,
        );
        const lvl1Element = categories[lvl0Element].children.findIndex(
            (cateItem) => cateItem.name === currentCategory.name,
        );
        children = children.map((item) => {
            return {
                name: item,
                level: 2,
                isActive: false,
            };
        });

        categories[lvl0Element].children[lvl1Element] = {
            ...categories[lvl0Element].children[lvl1Element],
            children: children,
            isActive: true,
        };

        if (currentCategory.isActive) {
            categories[lvl0Element].children[lvl1Element].isActive = false;
        }
    }

    return { categories: categories, types, brands };
};
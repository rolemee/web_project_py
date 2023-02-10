function usePagination() {
    const pagination = ref({
        page: 1,
        size: 10,
        total: 0,
        sizes: [10, 20, 50, 100],
        layout: 'total, sizes, ->, prev, pager, next, jumper',
        sort: null,
        order: null
    })

    function getParams(params = {}) {
        const baseParams = {
            pageIndex: pagination.value.page,
            pageSize: pagination.value.size
        }
        if (pagination.value.sort && pagination.value.order) {
            baseParams.sort = pagination.value.sort
            baseParams.order = pagination.value.order
        }
        Object.assign(baseParams, params)
        return baseParams
    }

    function onSizeChange(size) {
        return new Promise(resolve => {
            pagination.value.size = size
            resolve()
        })
    }

    function onCurrentChange(page) {
        return new Promise(resolve => {
            pagination.value.page = page
            resolve()
        })
    }

    return {
        pagination,
        getParams,
        onSizeChange,
        onCurrentChange
    }
}

export default usePagination

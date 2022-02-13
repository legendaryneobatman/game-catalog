export const getParams = (searchParams) => ({
    page: searchParams.get('page'),
    search: searchParams.get('search'),
    parent_platforms: searchParams.get('parent_platforms'),
    ordering: searchParams.get('ordering'),
})

export const updateParams = (setSearchParams, { page, search, parent_platforms, ordering }) => {
    const params = {
        page,
        ordering
    }
    if (Number(parent_platforms) !== 0) {
        params.parent_platforms = parent_platforms
    }
    if (search) {
        params.search = search;
    }
    setSearchParams(new URLSearchParams(params))
}
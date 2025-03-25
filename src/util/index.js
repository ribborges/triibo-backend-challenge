function filterNullFields(data) {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value != null));
}

export { filterNullFields };
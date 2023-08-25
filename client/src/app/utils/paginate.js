function paginate(items, numberPage, pageSize) {
  const startIndex = (numberPage - 1) * pageSize
  return [...items].splice(startIndex, pageSize)
}

export default paginate

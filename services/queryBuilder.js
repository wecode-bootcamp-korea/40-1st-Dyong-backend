const sortBy = (sort) => {
  switch (sort) {
    case 'new-arrival':
      return 'p.created_at DESC';
    case 'price-desc':
      return 'p.price DESC';
    case 'price-asc':
      return 'p.price';
  }
};

const typeBy = (type) => {
  const length = type.length;
  switch (length) {
    case 1:
      return `t.name = '${type[0]}'`;
    case 2:
      return `t.name = '${type[0]}' OR t.name = '${type[1]}'`;
    case 3:
      return `t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]}'`;
    case 4:
      return `t.name = '${type[0]}' OR t.name = '${type[1]}' OR t.name = '${type[2]}' OR t.name = '${type[3]}'`;
  }
};

module.exports = {
  sortBy,
  typeBy,
};

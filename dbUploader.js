const fs = require('fs');
const dotenv = require('dotenv');
const { appDataSource } = require('./app');

dotenv.config();

const userUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }
  for (const i in results) {
    const result = results[i];
    let full_name = result.full_name;
    let email = result.email;
    let username = result.username;
    let password = result.password;
    let phone_number = result.phone_number;
    appDataSource
      .query(
        `
        INSERT INTO users (
          full_name,
          email,
          username,
          password,
          phone_number
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        );`,
        [full_name, email, username, password, phone_number]
      )
      .then(() => console.log('SUCCESSFULLY UPLOADED!'))
      .catch((err) => console.log(err));
  }
};

const productsUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
      console.log(results);
    }
  }
  for (const i in results) {
    const result = results[i];
    let name = result.name;
    let content = result.content;
    let image_id = Number(result.image_id);
    let price = Number(result.price);
    let category_id = Number(result.category_id);
    let product_type_id = Number(result.product_type_id);
    appDataSource
      .query(
        `
            INSERT INTO products (
              name,
              content,
              image_id,
              price,
              category_id,
              product_type_id
            ) VALUES (
              ?,
              ?,
              ?,
              ?,
              ?,
              ?
            );`,
        [name, content, image_id, price, category_id, product_type_id]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

const imagesUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }

  for (const i in results) {
    const result = results[i];
    let main_image = result.main_image;
    let sub_image = result.sub_image;
    let content_image = result.content_image;
    appDataSource
      .query(
        `
        INSERT INTO images (
          main_image,
          sub_image,
          content_image
        ) VALUES (
          ?, ?, ?
        );`,
        [main_image, sub_image, content_image]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

const categoriesUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }
  for (const i in results) {
    const result = results[i];
    let name = result.name;
    appDataSource
      .query(
        `
        INSERT INTO categories (
          name
          ) VALUES (
          ?
        );`,
        [name]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

const productTypesUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }
  for (const i in results) {
    const result = results[i];
    let name = result.name;
    appDataSource
      .query(
        `
        INSERT INTO product_types (
          name
        ) VALUES (
          ?
        );`,
        [name]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

const commentsUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }
  for (const i in results) {
    const result = results[i];
    let user_id = result.user_id;
    let product_id = result.product_id;
    let content = result.content;
    let image_url = result.image_url;
    let rate = result.rate;
    appDataSource
      .query(
        `
        INSERT INTO comments (
          user_id,
          product_id,
          content,
          image_url,
          rate
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        );`,
        [user_id, product_id, content, image_url, rate]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

const ordersUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }
  for (const i in results) {
    const result = results[i];
    let user_id = result.user_id;
    let product_id = result.product_id;
    let content = result.content;
    let image_url = result.image_url;
    let rate = result.rate;
    appDataSource
      .query(
        `
        INSERT INTO comments (
          user_id,
          product_id,
          content,
          image_url,
          rate
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        );`,
        [user_id, product_id, content, image_url, rate]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

const statusCodesUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }
  for (const i in results) {
    const result = results[i];
    let status = result.status;
    appDataSource
      .query(
        `
        INSERT INTO comments (
          status
        ) VALUES (
          ?
        );`,
        [status]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

const cartsUpload = async (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const rows = data.split('\r\n');

  let results = [];
  let columnTitle = [];
  for (const i in rows) {
    const row = rows[i];
    const data = row.split(',');
    if (i === '0') {
      columnTitle = data;
    } else {
      let rowData = {};
      for (const index in columnTitle) {
        const title = columnTitle[index];
        rowData[title] = data[index];
      }
      results.push(rowData);
    }
  }
  for (const i in results) {
    const result = results[i];
    let user_id = result.user_id;
    let product_id = result.product_id;
    let quantity = result.quantity;
    let status_code_id = result.status_code_id;
    appDataSource
      .query(
        `
        INSERT INTO comments (
          user_id,
          product_id,
          content,
          quantity,
          status_code_id
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
        );`,
        [user_id, product_id, content, quantity, status_code_id]
      )
      .then(() => console.log(i))
      .catch((err) => console.log(err));
  }
};

module.exports = {
  userUpload,
  productsUpload,
  imagesUpload,
  categoriesUpload,
  cartsUpload,
  productTypesUpload,
  ordersUpload,
  commentsUpload,
  statusCodesUpload,
};

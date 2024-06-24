import { sortStrings } from "../../02-javascript-data-types/1-sort-strings";

export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = document.createElement('div');
    this.element.classList.add('sortable-table');
    this.subElements = {};
    this.render();
  }

  render() {
    const { header, body } = this.getTableElements();
    this.element.innerHTML = '';
    this.element.append(header, body);
    this.subElements = { header, body };
  }

  getTableElements() {
    const header = document.createElement('div');
    header.dataset.element = 'header';
    header.classList.add('sortable-table__header');
    header.append(...this.headerConfig.map(item => this.getHeaderCell(item)));

    const body = document.createElement('div');
    body.dataset.element = 'body';
    body.classList.add('sortable-table__body');
    body.append(...this.getTableRows());

    return { header, body };
  }

  getHeaderCell({ id, title, sortable }) {
    const cell = document.createElement('div');
    cell.classList.add('sortable-table__cell');
    cell.dataset.id = id;
    cell.dataset.sortable = sortable;

    cell.append(
      title,
      sortable
        ? `<span class="sortable-table__sort-arrow">
             <span class="sort-arrow"></span>
           </span>`
        : ''
    );

    return cell;
  }

  getTableRows() {
    return this.data.map(item => this.getTableRow(item));
  }

  getTableRow(item) {
    const row = document.createElement('div');
    row.classList.add('sortable-table__row');

    this.headerConfig.forEach((header) => {
      const cell = document.createElement('div');
      cell.classList.add('sortable-table__cell');

      if (header.template) {
        cell.textContent = header.template(item);
      } else {
        cell.textContent = item[header.id];
      }

      row.append(cell);
    });

    return row;
  }

  sort(field, order) {
    const fieldConfig = this.headerConfig.find(config => config.id === field);

    if (!fieldConfig || !fieldConfig.sortable) {
      return;
    }

    const k = order === 'asc' ? 1 : -1;

    if (fieldConfig.sortType === 'string') {
      this.data.sort((a, b) => k * a[field].localeCompare(b[field], ['ru', 'en'], { caseFirst: 'upper' }));
    } else {
      this.data.sort((a, b) => k * (a[field] - b[field]));
    }

    this.updateTable();
  }



  updateTable() {
    const { body } = this.subElements;
    body.innerHTML = '';
    body.append(...this.getTableRows());
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }


}

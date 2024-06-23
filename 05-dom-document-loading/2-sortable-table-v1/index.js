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
    if (typeof this.data[0][field] === 'string') {
      this.data.sort((a, b) => sortStrings([a[field], b[field]], order));
    } else {
      this.data.sort((a, b) => order === 'asc' ? a[field] - b[field] : b[field] - a[field]);
    }
  }

/**  sort(field, order) {
    const arrCopy = [...field];
    if (typeof arrCopy[0] === 'string')
      return sortStrings (arrCopy,order);
    return arrCopy.sort;


   this.data.sort((a, b) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        if (order === 'asc') {
          return a[field].localeCompare(b[field], ['ru', 'en'], { caseFirst: 'upper' });
        } else {
          return b[field].localeCompare(a[field], ['ru', 'en'], { caseFirst: 'upper' });
        }
      }

    });
  
  } 
}
 sortStrings(arr, param) {

  if (param === 'asc') {
      return arr.sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' }));
  }

  return arr.sort((a, b) => b.localeCompare(a, ['ru', 'en'], { caseFirst: 'upper' }));
} */

  remove(){
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

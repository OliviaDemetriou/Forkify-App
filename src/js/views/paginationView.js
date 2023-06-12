import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
        `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
          </button>
        `;
    }

    // Other page
    if (curPage < numPages) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
                  <span>Page ${curPage + 1}</span>
                  <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                  </svg>
              </button>
          `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
  //   _generateMarkup() {
  //     const curPage = this._data.page;
  //     const numPages = Math.ceil(
  //       this._data.results.length / this._data.resultsPerPage
  //     );
  //     console.log(numPages);

  //     // Page 1, and there are other pages
  //     if (curPage === 1 && numPages > 1) {
  //       return this._generateMarkupButton(1);
  //     }
  //     // Last page
  //     if (curPage === numPages && numPages > 1) {
  //       return this._generateMarkupButton(-1);
  //     }
  //     // Other page
  //     if (curPage < numPages) {
  //       return `${
  //         this._generateMarkupButton(1) + this._generateMarkupButton(-1)
  //       }`;
  //     }

  //     // Page 1, and there are other pages
  //     return '';
  //   }

  //   _generateMarkupButton(num) {
  //     const curPage = this._data.page;
  //     return `
  //       <button class="btn--inline pagination__btn--${num > 0 ? 'next' : 'prev'}">
  //       <span>Page ${num + curPage}</span>
  //       <svg class="search__icon">
  //         <use href="${icons}#icon-arrow-${num > 0 ? 'right' : 'left'}"></use>
  //       </svg>
  //     </button> `;
  //   }
}

export default new PaginationView();

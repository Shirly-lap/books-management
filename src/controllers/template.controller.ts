export class TemplateController {
    public booksTableBody: HTMLTableSectionElement;

    constructor(booksTableBody: HTMLTableSectionElement) {
        this.booksTableBody = booksTableBody;
    }

    render(books: Array<{ id: string, title: string, author: string, description: string, summary: string, publicationDate: string }>): void {
        this.booksTableBody.innerHTML = ''; 

        books.forEach(book => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = book.id;
            row.appendChild(idCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = book.description;
            row.appendChild(descriptionCell);

            const summaryCell = document.createElement('td');
            summaryCell.textContent = book.summary;
            row.appendChild(summaryCell);

            const publicationDateCell = document.createElement('td');
            publicationDateCell.textContent = book.publicationDate;
            row.appendChild(publicationDateCell);

            const actionsCell = document.createElement('td');
            actionsCell.classList.add('d-flex', 'gap-2', 'align-self-center')
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn', 'btn-warning');
            btnEdit.textContent = 'Edit';
            btnEdit.type = 'button';
            btnEdit.dataset.id = book.id;

            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger');
            btnDelete.textContent = 'Delete';
            btnDelete.type = 'button';
            btnDelete.dataset.id = book.id;

            actionsCell.appendChild(btnEdit);
            actionsCell.appendChild(btnDelete);
            row.appendChild(actionsCell);

            this.booksTableBody.appendChild(row);
        });
    }
}

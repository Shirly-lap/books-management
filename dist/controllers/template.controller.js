export class TemplateController {
    /**
     * Constructor de la clase TemplateController
     * @param booksTableBody - Elemento HTMLTableSectionElement donde se mostrarán los libros
     */
    constructor(booksTableBody) {
        this.booksTableBody = booksTableBody; // Inicializa el elemento de la tabla
    }
    /**
     * Renderiza una lista de libros en la tabla
     * @param books - Array de objetos que representan libros con propiedades id, title, author, description, summary, publicationDate
     */
    render(books) {
        // Limpia el contenido actual del cuerpo de la tabla
        this.booksTableBody.innerHTML = '';
        // Itera sobre cada libro en el array
        books.forEach(book => {
            // Crea una nueva fila para la tabla
            const row = document.createElement('tr');
            // Crea una celda para el ID del libro y añade el texto del ID
            const idCell = document.createElement('td');
            idCell.textContent = book.id;
            row.appendChild(idCell);
            // Crea una celda para el título del libro y añade el texto del título
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);
            // Crea una celda para el autor del libro y añade el texto del autor
            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);
            // Crea una celda para la descripción del libro y añade el texto de la descripción
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = book.description;
            row.appendChild(descriptionCell);
            // Crea una celda para el resumen del libro y añade el texto del resumen
            const summaryCell = document.createElement('td');
            summaryCell.textContent = book.summary;
            row.appendChild(summaryCell);
            // Crea una celda para la fecha de publicación del libro y añade el texto de la fecha de publicación
            const publicationDateCell = document.createElement('td');
            publicationDateCell.textContent = book.publicationDate;
            row.appendChild(publicationDateCell);
            // Crea una celda para los botones de acción (editar y eliminar)
            const actionsCell = document.createElement('td');
            actionsCell.classList.add('d-flex', 'gap-2', 'align-self-center');
            // Crea un botón para editar el libro
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn', 'btn-warning');
            btnEdit.textContent = 'Edit';
            btnEdit.type = 'button';
            btnEdit.dataset.id = book.id; // Asigna el ID del libro al atributo data-id del botón
            // Crea un botón para eliminar el libro
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger');
            btnDelete.textContent = 'Delete';
            btnDelete.type = 'button';
            btnDelete.dataset.id = book.id; // Asigna el ID del libro al atributo data-id del botón
            // Añade los botones de acción a la celda de acciones
            actionsCell.appendChild(btnEdit);
            actionsCell.appendChild(btnDelete);
            // Añade la celda de acciones a la fila
            row.appendChild(actionsCell);
            // Añade la fila a la tabla
            this.booksTableBody.appendChild(row);
        });
    }
}

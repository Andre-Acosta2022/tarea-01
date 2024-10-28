import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { Producto } from '../models/producto';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductoService } from '../services/producto.service';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [HomeComponent,ButtonModule, ToolbarModule, FileUploadModule,TableModule, DialogModule,DropdownModule,TagModule,RadioButtonModule,InputNumberModule, ConfirmDialogModule, FormsModule],
  providers: [MessageService, ConfirmationService, ProductoService],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
    productDialog: boolean = false;
    products: Producto[] = [];
    product: Producto = new Producto();  // Inicialización
    selectedProducts: Producto[] | null = null;  // Inicialización

    submitted: boolean = false;

    statuses: any[] = [];

    constructor(
        private productoService: ProductoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit() {
        this.productoService.getProducts().subscribe((productos) => {
            this.products = productos;
          });

          this.statuses = [
            { label: 'Activo', value: 'activo' },
            { label: 'Inactivo', value: 'inactivo' }
          ];
        }
    
    openNew() {
        this.product = new Producto();  // Cambiado {} por un nuevo objeto Producto
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Producto) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Producto) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.nombre + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = new Producto();  // Cambiado {} por un nuevo objeto Producto
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.nombre?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = new Producto();  // Cambiado {} por un nuevo objeto Producto
        }
    }

    findIndexById(id: number): number {  // Cambiado el tipo de string a number
        return this.products.findIndex(product => product.id === id);
    }

    createId(): number {
        return Math.floor(Math.random() * 10000);  // Genera un ID aleatorio
    }
    getSeverity(estado: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
        switch (estado) {
            case 'PENDIENTE':
                return 'warning';
            case 'APROBADO':
                return 'success';
            case 'RECHAZADO':
                return 'danger';
            default:
                return undefined; 
    }
}

}

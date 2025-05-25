import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoBase64 from '../src/assets/images/logo.png'; // Asegurate que sea base64 o convierte el logo a base64

// Función principal
export const generateProformaPdf = async (order, userData) => {
    if (!order || !userData) {
        return console.error("Faltan datos para generar la proforma.");
    }

    const doc = new jsPDF();
    const fecha = new Date(order.date).toLocaleDateString("es-AR");

    // === LOGO ===
    doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30); // Cuadrado

    // === TITULO ===
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('PRESUPUESTO', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`N° 0000${order._id?.toString().slice(-4)}`, 150, 12);
    doc.text(`Fecha: ${fecha}`, 150, 17);

    // === DATOS EMPRESA ===
    doc.setFontSize(10);
    doc.text('AVIB TECHNOLOGY', 10, 45);
    doc.text('Casa Central: SAN LORENZO 2584 - SAN MARTÍN', 10, 50);
    doc.text('TEL: 11 27721921', 10, 55);
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(12);
    doc.text('MONOTRIBUTISTA - CATEGORÍA C', 10, 61);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('CUIT: 20-95695720-7 - INICIO ACT.: 30/10/2024', 10, 66);
    doc.text('ING. BRUTOS: 20956957207', 10, 71);

    doc.line(10, 75, 200, 75);

    // === DATOS DEL CLIENTE ===
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text('CLIENTE:', 10, 82);
    doc.setFontSize(10);
    doc.text(`Nombre: ${userData.name}`, 10, 87);
    doc.text(`Email: ${userData.email}`, 10, 92);
    doc.text(`Nacionalidad: ${userData.country}`, 10, 97);
    doc.text(`Entrega: Retira en domicilio`, 10, 102);
    doc.line(10, 106, 200, 106);

    // === TABLA DE PRODUCTOS ===
    const productos = order.products.map((p) => {
        const desc = p.discount || 0;
        const precioDesc = p.price * (1 - desc / 100);
        const subtotal = precioDesc * p.quantity;

        return [
        p.name,
        p.quantity,
        `$${p.price.toLocaleString('es-AR')}`,
        `${desc}%`,
        `$${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
        ];
    });

    autoTable(doc, {
        head: [['Descripción', 'Cantidad', 'Precio Unitario', 'Descuento', 'Subtotal']],
        body: productos,
        startY: 110,
        styles: {
        fontSize: 9,
        cellPadding: 3,
        valign: 'middle'
        },
        headStyles: {
        fillColor: [0, 102, 204],
        textColor: 255,
        halign: 'center',
        },
        bodyStyles: {
        textColor: 50
        }
    });

    // === TOTAL ===
    const totalPesos = order.products.reduce((acc, p) => {
        const desc = p.discount || 0;
        const precioFinal = p.price * (1 - desc / 100);
        return acc + precioFinal * p.quantity;
    }, 0);

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`TOTAL A PAGAR: $ ${totalPesos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, 10, finalY);

    // === FOOTER ===
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text('Documento generado automáticamente por AVIB Technology.', 10, 285);

    doc.save(`Presupuesto_${order._id}.pdf`);
};

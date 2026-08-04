# Diagrama de Clases — AutosEnfasis-I

> Basado en los esquemas del estado Redux, las acciones de API y los componentes de UI.
> Solo relaciones, sin atributos internos.

```mermaid
classDiagram
    direction TB

    class Cliente
    class SesionAuth
    class Perfil
    class Direccion
    class Pedido
    class ItemCarrito
    class ItemFavoritos
    class Vehiculo
    class Categoria

    %% Un Cliente tiene una sesión JWT activa
    Cliente "1" --> "1" SesionAuth : autentica con

    %% El perfil pertenece al Cliente
    Cliente "1" *-- "1" Perfil : tiene

    %% Un Cliente puede tener varias direcciones
    Cliente "1" *-- "0..*" Direccion : registra

    %% Un Cliente tiene un carrito con ítems
    Cliente "1" *-- "0..*" ItemCarrito : agrega al carrito

    %% Un Cliente tiene una lista de favoritos
    Cliente "1" *-- "0..*" ItemFavoritos : guarda en favoritos

    %% Un Cliente puede realizar muchos pedidos
    Cliente "1" *-- "0..*" Pedido : realiza

    %% Cada ítem del carrito referencia un Vehículo
    ItemCarrito "0..*" --> "1" Vehiculo : contiene

    %% Cada ítem de favoritos referencia un Vehículo
    ItemFavoritos "0..*" --> "1" Vehiculo : referencia

    %% Un Pedido agrupa varios ítems del carrito
    Pedido "1" --> "0..*" ItemCarrito : incluye

    %% Cada Vehículo pertenece a una Categoría
    Vehiculo "0..*" --> "1" Categoria : clasificado en
```

---

## Descripción de entidades

| Entidad | Descripción | Origen en el código |
|---|---|---|
| **Cliente** | Usuario registrado y autenticado | `user-slice.js` |
| **SesionAuth** | Token JWT almacenado en localStorage | `user-slice.js` → `user.token` |
| **Perfil** | Datos del cliente (email, teléfono) | `user-slice.js` → `profile` |
| **Direccion** | Dirección de entrega del cliente | API `POST /customer/address` |
| **ItemCarrito** | Vehículo agregado al carrito con cantidad | `user-slice.js` → `cart[]` |
| **ItemFavoritos** | Vehículo guardado en lista de favoritos | `user-slice.js` → `wishlist[]` |
| **Pedido** | Orden de compra generada desde el carrito | `user-slice.js` → `orders[]` |
| **Vehiculo** | Producto del catálogo (nombre, precio, imagen, tipo) | `shpping-slice.js` → `products[]` |
| **Categoria** | Tipo/categoría al que pertenece un vehículo | `shpping-slice.js` → `categories[]` |

---

## Leyenda de relaciones

| Símbolo | Significado |
|---|---|
| `*--` | Composición (el objeto hijo depende del padre) |
| `-->` | Asociación (referencia independiente) |
| `"1"` / `"0..*"` | Multiplicidad |

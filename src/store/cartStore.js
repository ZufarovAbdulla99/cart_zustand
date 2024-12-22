import { create } from "zustand"

const useCartStore = create((set) => ({
    products: [],
    addProduct: (newProduct) => set((state) => ({
        products: [...state.products, newProduct],
    })),
    incrementProductQuantity: (productId) => set((state) => ({
        // products: state.products.map((product) => {
        //     if(product.id === productId){
        //         return { ...product, quantity: product.quantity + 1 }
        //     }
        //     else {
        //         return product
        //     }
        // })
        // // one line code
        products: state.products.map((product) => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product)
    })),
    decrementProductQuantity: (productId) => set((state) => ({
        // products: state.products.map((product) => {
        //     if(product.id === productId && product.quantity > 1){
        //         return { ...product, quantity: product.quantity - 1 }
        //     }
        //     else {
        //         return product
        //     }
        // })
        // // one line code
        products: state.products.map((product) => product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product)
    })),
    removeProduct: (productId) => set((state) => ({
        products: state.products.filter((product) => product.id !== productId)
    })),
}))

export default useCartStore
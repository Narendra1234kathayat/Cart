import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalItem:0,
    totalPrice:0,
};

const cartSlice = createSlice({
    name: 'cart',  // Add a name for the slice
    initialState,
    reducers: {
        addproduct(state, action) {
           // state.cart.push(action.payload);
            console.log(action.payload.id);
            const findItem = state.cart.find(item => {return item.id === action.payload.id});
            //console.log(findItem);
            if (findItem) {
                findItem.quantity +=1;
                console.log(findItem.price);
                state.totalPrice = state.totalPrice + findItem.price
                console.log("yes");
            }else{
                state.cart.push(action.payload)
                state.totalPrice = state.totalPrice + action.payload.price;
            }
        },
        removeproduct(state, action) {
            const productToRemove = state.cart.find(product => product.id === action.payload.id);
            if (productToRemove) {
                const totalpricetoremove = productToRemove.price * productToRemove.quantity;
                state.cart = state.cart.filter(product => product.id !== action.payload.id);
                console.log(state.totalPrice)
                state.totalPrice -= totalpricetoremove;
                state.totalItem -= productToRemove.quantity;
            }
        },
        increaseQuantity(state,action){
            const findproduct=state.cart.find(product => product.id===action.payload.id);
            if(findproduct){
                findproduct.quantity +=1;
                state.totalPrice+= findproduct.price
            }
        },
        reduceQuantity(state, action) {
            const findproduct = state.cart.find(product => product.id === action.payload.id);
            if (findproduct) {
                if (findproduct.quantity > 1) {
                    findproduct.quantity -= 1;
                    state.totalPrice -= findproduct.price;
                    state.totalItem -= 1;
                } else {
                    const totalpricetoremove = findproduct.price;
                    state.cart = state.cart.filter(product => product.id !== findproduct.id);
                    state.totalPrice -= totalpricetoremove;
                    state.totalItem -= 1;
                }
            }
        }
        
        
    }
});

export const { addproduct, removeproduct,increaseQuantity,reduceQuantity } = cartSlice.actions;
export default cartSlice.reducer;

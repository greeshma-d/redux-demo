const redux = require("redux");
const createStore = redux.createStore;
const produce = require('immer').produce;

const initialState = {
    name: "Name1",
    address: {
        street: "123 Main Street",
        city: "Boston",
        state: "MA",
    },
};

const UPDATE_STREET = "UPDATE_STREET";

function updateStreet (street) {
    return {
        type: UPDATE_STREET,
        payload: street,
    }
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case UPDATE_STREET: {
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: actions.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = actions.payload;
            })
        }
        default: return state;
    }
}

const store = createStore(reducer);
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("Updated state", store.getState())
});

store.dispatch(updateStreet("456 Main Street"));

unsubscribe();
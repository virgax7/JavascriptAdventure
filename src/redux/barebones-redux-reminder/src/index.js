import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {connect} from "react-redux";

// first some helper objects
let peopleid = 3;
const AGE = {YOUNG: "young", OLD: "old"};
const defaultPeople = [{name: "person1", age: AGE.YOUNG}, {name: "person2", age: AGE.OLD}];

// first the reducer(function used by the store to reduce things into a new state)
let toggle = true;

function countReducer(state = {people: defaultPeople}, action) {
    console.log(toggle ? "called initially from createStore.dispatch to set the initial state tree" : "");
    console.log("countReducer called with state : " + JSON.stringify(state, null ,2));
    console.log("\n and action : " + JSON.stringify(action, null, 2));

    if (action.type === "ADD_OLD_PERSON") {
        return {people: state.people.concat({name: "person" + peopleid++, age: AGE.OLD})};
    }
    if (action.type === "ADD_YOUNG_PERSON") {
        return {people: state.people.concat({name: "person" + peopleid++, age: AGE.YOUNG})};
    }
    return state;
}

// create our store and specify the reducer, this store should correspond to the Provider's store prop
const store = createStore(countReducer);
toggle = false;
// you can hook up event-listeners with subscribe. This will get triggered when the store gets updated
store.subscribe(() => console.log("store has updated, state is now " + JSON.stringify(store.getState(), null, 2)));

function peopleList(age, self) {
    return (
        <div>
            <p>{age.toString()} people:</p>
            <button onClick={age === AGE.YOUNG ? self.props.addYoungPerson : self.props.addOldPerson}>add Person
            </button>
            <ol>
                {self.props.people
                    .filter(person => person.age === age)
                    .map(person => <li key={person.name}>{person.name}</li>)}
            </ol>
        </div>
    );
}

// since PeopleList hasn't been "connected", it doesn't have the props
// that App has been given(remember App has been "connected")
// so then... instead we send the props in App to PeopleList
class PeopleList extends Component {
    render() {
        console.log("PeopleList.render called");
        return (
            <div>
                {peopleList(AGE.YOUNG, this)}
                <p>------------------------------</p>
                {peopleList(AGE.OLD, this)}
            </div>
        );
    }
}

class App extends Component {
    render() {
        console.log("App.render called");
        return (
            <div>
                <PeopleList people={this.props.people}
                            addOldPerson={this.props.addOldPerson}
                            addYoungPerson={this.props.addYoungPerson}/>
            </div>
        );
    }
}

// mapStateToProps is a convention, where state is the data in the store and props are what's
// given to connected components. The returned object from mapStateToProps are given to your components as props
function mapStateToProps(state) {
    console.log("mapStateToProps called " + JSON.stringify(state));
    return {
        people: state.people
    };
}

// same Idea for mapDispatchToProps
function mapDispatchToProps(dispatch) {
    console.log("mapDispatchToProps called " + JSON.stringify(dispatch));
    return {
        addOldPerson: () => dispatch({type: "ADD_OLD_PERSON"}),
        addYoungPerson: () => dispatch({type: "ADD_YOUNG_PERSON"})
    };
}

// App is connected to the redux store, so it's an entry point...
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
// the above is actually doing this
// <Connect>
//      <App people={people}
//          addOldPerson={addOldPerson}
//          addYoungPerson={addYoungPerson} />
//// where these props are the objects returned from mapStateToProps
// </Connect>


ReactDOM.render(
    // Provider wraps all child components(highest ordered component), which lets child components use connect to pass
    // data with hooked up store
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();



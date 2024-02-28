import { Component } from 'react'

import nextId, { resetId } from "react-id-generator"
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeersList from '../employeers-list/employeers-list';
import EmployeesAddForm from '../employeers-add-form/employeers-add-form';

import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: nextId()},
                {name: 'Alex M.', salary: 3000, increase: false, rise: false, id: nextId()},
                {name: 'Carl W.', salary: 15000, increase: false, rise: false, id: nextId()}
            ],
            term: '',
            filter: ''
        }
    }



    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }


    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise === true)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            case 'fromMoreToLess':
                return items.sort((a, b) => b.salary - a.salary)
            case 'fromLessToMore':
                return items.sort((a, b) => a.salary - b.salary)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        
        const {data, term, filter} = this.state
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                employeersNum={this.state.data.length}
                employeersIncrease={this.state.data.filter(employee => employee.increase === true).length}/>
    
                <div className="search-panel">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
    
    
                <EmployeersList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
    
                <EmployeesAddForm
                onAdd={this.addItem}/>
            </div>
        );
    }
    
}


export default App;
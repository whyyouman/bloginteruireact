import React from 'react';
import axios from 'axios';
import { getByTitle } from '@testing-library/dom';

export default class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          title : [],
          content: [],
          file : [],
          data: [],
          loading: true,
        }

      }

        getTitle = (e) => {
            this.setState({
                title : e.target.value
            })
        };

        getImage = (e) => {
          this.setState({
            file : e.target.value
          })
        };

        getContent = (e) => {
          this.setState({
            content : e.target.value
          })
        };

        saveData = () => {
            if(this.state.title == ""){
              alert("Title is required !")
            } else if(this.state.content == ""){
              alert(" content is required ! ")
            } else {

              console.log(this.state.title)

            axios({
                method: 'POST',
                url: 'http://127.0.0.1:8000/post_blog/',
                data: {
                  title : this.state.title,
                  content : this.state.content,
                  image : this.state.file,
                  date: '1-1-2021',
                },
            })
            .then((result) => {
              this.getData()
              console.log(result)
            })
            .catch((error) => {
              console.log(error)
            })

            }
        }


        getData() {
          axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/get_blog/',
          })
          .then((result) => {
            this.setState({
              data: result.data,
              loading: false
            })
          })
          .catch((error) => {
            this.setState({
              loading: false
            })
          })
        }

        componentDidMount() {
          this.getData();
        }


    render(){

      const {data, loading} = this.state;

      console.log(data)

        return(
            <>
            <div className="container">
              <div className="row ">
                <div className="col-sm-12 mt-5">
                  <input className="form-control" type="text" name="title" placeholder="Title" onChange={this.getTitle} />
                </div>
                <div className="col-sm-12 mt-5">
                  <input className="form-control" type="file" onChange={this.getImage} />
                </div>
                <div className=" col-sm-12 mt-5">
                  <textarea className="form-control" name="content" placeholder="Content" onChange={this.getContent} />
                </div>
                <div className=" col-sm-12 mt-5">
                  <button className="btn btn-primary" onClick={this.saveData}> Post </button>
                </div>
              </div>


              {loading ? (
                  <>
                    <p> Wait Loading ................... </p>
                  </>
              ) : (
                  <>

                  
                        <>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">index</th>
                              <th scope="col">Title</th>
                              <th scope="col">Content</th>
                              <th scope="col">Image</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>

                        {data.map((item, index) => {
                            return (
                              <>

                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{item.title}</td>
                              <td>{item.content}</td>
                              <td>{item.image}</td>
                              <td> 
                                <button> Edit </button> 
                                <button> Delete </button>
                              </td>
                            </tr>

                              </>
                            )
                        })}
                          
                          
                            

                          </tbody>
                        </table>
                        </>
                 

                  </>
              )}

              </div>
  
            </>
        )
    }
}
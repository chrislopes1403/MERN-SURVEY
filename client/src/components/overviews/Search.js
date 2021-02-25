import React from 'react';



class Search extends React.Component {
    


    state = { term:'' };


    onInputChange = (event) =>
    {
        this.setState({term:event.target.value});
    };

    onFormSubmit = (event) =>
    {
        event.preventDefault();

        this.props.onSubmit(this.state.term);
    };



    render() { 
        return (
            <form onSubmit ={this.onFormSubmit} >

            <div className="ui category search"  style={{ textAlign: 'center' }} onClick={(e)=>this.onFormSubmit(e)}>
                
                <div className="ui icon input">

                    <input 
                        className="prompt" 
                        type="text"    
                        style={{height:'10px',width:'500px'}} 
                        placeholder="Search key words in user responses... "
                        value={this.state.term} onChange={this.onInputChange}
                    />
                    <i className="search icon" ></i>
                </div>

                <div className="results"></div>

            </div>                    
            </form>);
    }
}
 
export default Search;
import {useState, useEffect } from 'react'
const { default: Title } = require("./Title")

const Repos = () => {
    const [searchData, setSearchData] = useState('')
    const [filterRepos, setFilterRepos] = useState([])
    const [repositories, setRepositories] = useState([])
    
    
    useEffect(()=>{
        async function getData() {
            const response = await fetch(`https://api.github.com/users/talinejoventino/repos`)
            const datas = await response.json()
            
            setRepositories(datas)
        }
        getData()
        
    }, [])
    
    useEffect (()=>{
        setFilterRepos(
            repositories.filter(nameRepo =>{
                return nameRepo.name.includes(searchData)
            }) 
            )
            
        }, [searchData, repositories])
        
        
        
        
        return(
            <>
            <Title> Pesquise um repositório </Title>
            <input type='text' placeholder='Digite um repositório'  onChange={e => {setSearchData(e.target.value)}} />


            <ul >{filterRepos.map(repo => {
                return <li key={repo.id} > {repo.name} </li>
            })}
            </ul>
        </>
    )
}

export default Repos;
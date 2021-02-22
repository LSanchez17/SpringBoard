import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchTitlesFromApi} from '../helpers/titles';
import {sendVoteToApi} from '../helpers/posts';

const TitleList = () => {
    const titles = useSelector(currState => currState.titles);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect( () => {
        const fetchTitle = async () => {
            await dispatch(fetchTitlesFromApi());
            setIsLoaded(false);
        }

        if(isLoaded){
            fetchTitle();
        }
    }, [dispatch, isLoaded]);

    const vote = (direction, id) => {
        dispatch(sendVoteToApi(id, direction));
    }

    if(isLoaded){
        return <b>Loading..</b>;
    }

    if(!isLoaded && titles.length === 0){
        return <b>Please create a new post</b>;
    }

    return (
        <div>
            {titles.map( title => (
                <div key={title.id}>
                    <Link to={`/${title.id}`}>{title.title}</Link>
                    <h3>{title.description}</h3>
                    <h4><small>{title.votes} Votes</small></h4>
                    <button onClick={evt => vote('up', title.id)}>Upvote</button>
                    <button onClick={evt => vote('down', title.id)}>Downvote</button>
                </div>
            ))}
        </div>
    )
}

export default TitleList;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Placeholder from '../../assets/placeholder.jpg'

import 'react-quill/dist/quill.snow.css';
import modules from '../../utils/quilModules'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './SubtopicEdit.css'

const SubtopicEdit = () => {
    let {id, matId, topicId} = useParams();
    const [cover, setCover] = useState()
    const [subtopic, setSubtopic] = useState({
        'title': '',
        'subtitle': '',
        'body': '',
        'cover': cover,
        'topic': topicId
    })

    const navigate = useNavigate();

    const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/subtopic/${matId}/edit/`
    const urlFetch = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/subtopic/${matId}/`

    useEffect(()=>{
        const fetchSubtopicDetails = async () => {
            try {
                const response = await fetch(urlFetch);
                if (!response.ok) {
                    console.error('Error fetching subtopic data:', 
                    response.status, response.statusText);
                    return
                }
                const data = await response.json();
                setSubtopic(data)

                if (data.cover) {
                    setCover(data.cover);
                }
            } catch(error) {
                alert("Error fetching details: " + error)
            }
        }
        fetchSubtopicDetails()
    }, [urlFetch])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubtopic({ ...subtopic, [name]: value });
    };

    const updateSubtopic = async () => {
        const formData = new FormData()
        formData.append('title', subtopic.title);
        formData.append('subtitle', subtopic.subtitle);
        formData.append('body', subtopic.body);
        formData.append('topic', topicId);
        if (cover) {
            formData.append('cover', cover);
        }

        try {
            const response = await fetch(url, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            console.error('Error updating subtopic. Server responded with:',
            response.status, response.statusText);
            return;
        }

            const data = await response.json();
            setSubtopic(data)
            navigate(`/learning/${id}/topic/${topicId}/`)
        } catch (error) {
            console.error('Error updating subtopic:', error);
        }
    }

    let uploadCover = async () => {
        const formData = new FormData();
        formData.append('cover', cover);
        formData.append('topic', topicId);
            
        const response = await fetch(url, {
          method: "PUT",
          body: formData,
        })
      
        if (cover) {
          const data = await response.json();
          setSubtopic({ ...subtopic, cover: data.cover });
        }
    }

    const cancel = () => {
        navigate(`/learning/${id}/topic/${topicId}/`)
    }
    
  return (
    <div className='subtopic-edit-container'>
        <h1>{subtopic.title}</h1>
        <div className="section-form">
            <div className="cover-preview">
                { subtopic.cover ? 
                    <img src={'http://127.0.0.1:8000/' + 
                        subtopic.cover} alt="section cover" />
                    // <img src={section.cover} alt="section cover" />
                    :
                    <img src={Placeholder} alt="subtopic cover" />
                }
            </div>

            <div className="horizontal-container cover-container">
                <input 
                    className='section-cover-input'
                    type='file' 
                    accept='image/*' 
                    // key={inputKey}
                    value={undefined} 
                    onChange={(e)=> setCover(e.target.files[0])}
                />

                <button
                    onClick={uploadCover}
                    className='section-add-btn'>
                    Upload
                </button>
            </div>

            <input
                className='section-title-input'
                type='text'
                name='title'
                placeholder='Title...'
                value={subtopic.title}
                onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
            />

            <input
                className='section-subtitle-input'
                type='text'
                name='subtitle'
                placeholder='Subitle...'
                value={subtopic.subtitle}
                onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'subtitle' } })}
            />

            <ReactQuill 
              className='editor-input'
              modules={modules}
              theme="snow" 
              value={subtopic.body} 
              placeholder='Type here...'
              onChange={body => handleInputChange({ target: { value: body, name: 'body' } })}
            />

            <button 
                className='section-add-btn'
                onClick={updateSubtopic}>
                Done
            </button>
            
            <button 
                className='section-cancel-btn'
                onClick={cancel}
            >
                Cancel
            </button>
        </div>
    </div>
  )
}

export default SubtopicEdit
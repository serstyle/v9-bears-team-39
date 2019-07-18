/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useContext, useEffect } from 'react';
import marked from 'marked';
import { makeStyles } from '@material-ui/core/styles';
import FormTextField from './FormTextField';
import SimpleTabs from './Tabs';
import DefaultButton from './DefaultButton'
import WikiContext from '../contexts/wikis/wikiContext';
import AuthContext from '../contexts/auth/authContext';

export default function WikiEdit(props) {
  const useStyles = makeStyles(materialTheme => ({
    root: {
      marginLeft: '0px',
    },
    button: {
      textAlign: 'right',
    }
  }));
  const classes = useStyles();

  const wikiContext = useContext(WikiContext);
  const { addWiki, current } = wikiContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const userid = user._id;

  useEffect(() => {
    if (current !== null) {
      setWiki(current);
    } else {
      setWiki({
        title: '',
        body: '',
      });
    }
  }, [wikiContext, current]);


  const [wiki, setWiki] = useState({
    title: '',
    body: '',
    userid
  });
  const { title, body } = wiki;

  const handleChange = name => e => {
    setWiki({ ...wiki, userid, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWiki(wiki);
    props.save();
  };

  marked.setOptions({
  // whether to conform to original MD implementation
  pedantic: false,
    // Github Flavoured Markdown
  gfm: true,
    // smarter list behavior
  smartLists: true,
  // "smart" typographic punctuation for things like quotes and dashes
  smartypants: false,
  });

  const markdown = <div dangerouslySetInnerHTML={{ __html: marked(body) }} />;
  const { save } = props;
  return (
    <div>
      <FormTextField
        label="Wiki Title"
        variant="outlined"
        value={title}
        onChange={handleChange('title')}
      />
      <SimpleTabs className={classes.root}
        style={{ witdh: '100%' }}
        label1="Write"
        container1={
          <FormTextField
            label="Write your content in here..."
            multiline
            rows="10"
            variant="outlined"
            value={body}
            onChange={handleChange('body')}
          />
        }
        label2="Preview"
        container2={
          <div style={{ borderStyle: 'solid', borderWidth: 1, marginTop: 20, padding: 10, borderRadius: 5, minHeight: 225, borderColor: '#0000003b'}}>{ body ? markdown : 'Add some content first...'}</div>
        }
        
      />
      <p>
        <span style={{ marginRight: 5 }}>
          <a href="https://gitlab.com/help/user/markdown" target="_blank">
            Markdown
          </a>
        </span>
        <span>is supported</span>
      </p>
      <div className={classes.button}>
        <DefaultButton 
          name="Save Wiki"  
          variant="contained" 
          color="secondary"
          onClick={handleSubmit}
          save={save}
        />
      </div>
    </div>
  );
}

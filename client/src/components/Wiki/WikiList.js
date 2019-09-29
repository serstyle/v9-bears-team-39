import React, { useEffect, useContext } from 'react';
import DefaultButton from '../DefaultButton';
import AuthContext from '../../contexts/auth/authContext';
import WikiContext from '../../contexts/wikis/wikiContext';
import WikiItem from './WikiItem';
import AlertContext from '../../contexts/alert/alertContext';
import Alert from '../Alert';

import WikiEdit from './WikiEdit';
import Preloader from '../Preloader';

export default function WikiList() {
  const [open, setOpen] = React.useState(false);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const wikiContext = useContext(WikiContext);
  const { wikis, getWikis, isLoading, addWiki } = wikiContext;

  useEffect(() => {
    getWikis(user._id);
    // eslint-disable-next-line
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    setOpen(true);
    setAlert('Updated Wiki successfully', 'success');
  };

  const handleDelete = () => {
    setAlert('Deleted Wiki successfully', 'success');
  };
  const handleClose = () => {
    addWiki();
    setOpen(false);
  };
  return (
    <div>
      {open ? (
        <WikiEdit save={handleClose} />
      ) : (
        <div>
          <DefaultButton
            name="Add New Wiki"
            variant="contained"
            color="secondary"
            onClick={handleOpen}
          />
          <Alert />
        </div>
      )}
      {!open && wikis !== null && !isLoading && wikis.length === 0 ? (
        <h2> Add your first Wiki here</h2>
      ) : null}
      {!open && wikis && !isLoading ? (
        wikis.map(wiki => (
          <div key={wiki._id}>
            <WikiItem update={handleUpdate} del={handleDelete} wikis={wiki} />
          </div>
        ))
      ) : !open ? (
        <Preloader />
      ) : null}
    </div>
  );
}

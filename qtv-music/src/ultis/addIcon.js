import { library} from '@fortawesome/fontawesome-svg-core' 
import {  fas, faSearch, faUserLock, faShoppingBag, faUserCheck, faPlayCircle, faPlay, faTimesCircle, faTimes, faPlus, faMinus, faTrash  } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'


function addIcon(){
    library.add( fab, fas,  faSearch, faUserLock, faShoppingBag, faUserCheck, faPlayCircle, faPlay,faTimesCircle, faTimes, faPlus, faMinus, faTrash )
};

export default {
    addIcon
}

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
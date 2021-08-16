import { currentUser } from '../firebase/autenticacion.js';
import { deleteLikePost, addLike } from '../views-controllers/post-control.js';
import { getLike, deletePost, editPost } from '../firebase/data-base.js';
// import { comment } from '../firebase/data-base.js';

export const sharingPost = (data) => {
  const time = new Date(data.timePost.toDate());
  const sectionPost = document.createElement('section');
  const template = `
  <section>
          <ul class="ul-parent">
              <li class="li-child">
              <!-- contenedor del nombre, fecha ,eliminar,guardar y editar post-->
                  <section class="section-post">
                      <section class="user-publicated padding flex-name-post">
                          <section class="only-flex">
                              <section>
                                  <p class="display-name">${data.user}</p>
                              </section>
                              <p class="date-publication">
                              ${time.getHours()}${':'}${time.getMinutes()}
                              ${time.getDate()}${'/'}${time.getMonth() + 1}${'/'}${time.getFullYear()}
                              </p>
                          </section>
                          <section class="button-btn">
                            <select id="select-Priv" class="btn-select" name="select">
                              <option value="privado">Privado</option>
                              <option value="público" selected>Público</option>
                            </select>
                            <section>
                            <button id="deletePost" class="botones">
                                <i class="fas fa-trash" aria-hidden="true"></i>
                            </button>
                            <button id="savePost" class="hide botones">
                                <i class="fas fa-save" aria-hidden="true"></i>
                            </button>
                            <button id="edit-${data.id}" class="botones">
                                <i class="fas fa-edit" aria-hidden="true"></i>
                            </button>
                            </section>
                          </section>
                      </section>
                    
                      <!--contenedor de la publicacion-->
                    <section class="middle-post">

                    <aside class="modal-container" id="modal-container">
                      <aside class="modal modal-close" id="modal">
                        <p class="close-estatistics">¿Deseas borrar tu post?</p>
                        <section class="btn-modal">
                          <button class="yes" id="aceptar">SI</button>
                          <button class="no" id="close">NO</button>
                        </sectionc>
                      </aside>
                  </aside>

                      <section class="content-posts">
                          <figure class="user-img"> <img class="img-perfil2" src='${data.Photo}'/> </figure>
                          <section class="form-save">
                            <form class="form-save" maxlength="50" required>
                            <textarea class="textarea-post" id="text-post" disabled>${data.postText}</textarea>
                              <section class="heart-commet">
                            <button id="liked-${data.id}" class="bottom-heart">
                                <p id="container-like"></p>
                                <i id="counter-${data.id}" class="fa fa-heart-o heart-empty" aria-hidden="true"></i>
                            </button>
                            <button class="show-comment">
                                <span id="show-comment">
                                  <i class="fa fa-comment-o show-comment" aria-hidden="true"></i>
                                </span>
                                <a class="counter-comment">2</a>
                            </button>
                            </section>
                            <section class="comment-form">
                            <form class="form-comment" maxlength="50" required>
                              <textarea placeholder="Escribe tu comentario" id="tex-comment" class="textarea-comment">
                              </textarea>
                              <button id="comment-plane">
                                <span class="comment">
                                  <i class="fa fa-paper-plane btn-comment" aria-hidden="true"></i>
                                </span>
                              </button>
                            </form>
                          </section>
                          <section></section>
                      </section>
              </li>
            </ul>
    </section>
      `;

  sectionPost.innerHTML = template;
  sectionPost.setAttribute('class', 'contenedor-post');

  // borre const de like
  // const btnLike = sectionPost.querySelector(`#like-${data.id}`);

  const btnLike = sectionPost.querySelector(`#liked-${data.id}`);
  const counterLike = sectionPost.querySelector(`#counter-${data.id}`);
  // agregando likes
  const contadorLikes = (likes) => {
    const countLike = likes.length;
    counterLike.innerHTML = countLike;
  };

  const likesPintadosPost = (likes) => {
    likes.forEach((element) => {
      if (currentUser().uid === element.id) {
        btnLike.classList.remove('not-like');
        btnLike.classList.add('liked');
        btnLike.dataset.like = '1';
      }
    });
  };

  getLike(data.id, contadorLikes, likesPintadosPost);

  btnLike.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.dataset.like === '0') {
      e.target.dataset.like = '1';
      addLike(data.id);
      btnLike.classList.remove('not-like');
      btnLike.classList.add('liked');
    } else {
      e.target.dataset.like = '0';
      deleteLikePost(data.id);
      btnLike.classList.remove('liked');
      btnLike.classList.add('not-like');
    }
  });

  const deletedPost = sectionPost.querySelector('#deletePost');
  const editedPost = sectionPost.querySelector(`#edit-${data.id}`);
  const savePost = sectionPost.querySelector('#savePost');
  const textToEdit = sectionPost.querySelector('#text-post');

  const close = sectionPost.querySelector('#close');
  const modal = sectionPost.querySelector('#modal');
  const modalContainer = sectionPost.querySelector('#modal-container');
  const aceptar = sectionPost.querySelector('#aceptar');

  if (data.idUser !== currentUser().uid) {
    deletedPost.classList.add('hide');
    editedPost.classList.add('hide');
  } else {
    deletedPost.addEventListener('click', () => {
      modalContainer.style.opacity = '1';
      modalContainer.style.visibility = 'visible';
      modal.classList.toggle('modal-close');
    });
    close.addEventListener('click', () => {
      modal.classList.toggle('modal-close');

      setTimeout(() => {
        modalContainer.style.opacity = '0';
        modalContainer.style.visibility = 'hidden';
      }, 600);
    });

    aceptar.addEventListener('click', () => {
      deletePost(data.id);
    });

    editedPost.addEventListener('click', () => {
      savePost.classList.remove('hide');
      editedPost.classList.add('hide');
      textToEdit.disabled = false;
      textToEdit.select();
    });

    savePost.addEventListener('click', () => {
      editedPost.classList.remove('hide');
      savePost.classList.add('hide');
      editPost(data.id, textToEdit.value);
      textToEdit.disabled = true;
    });
  }

  // borre funcionalidad del like

  // agregando comentarios al post

  // const btnComment = sectionPost.querySelector('#comment-plane');
  // btnComment.addEventListener('click', () => {
  //   const textComment = sectionPost.querySelector('#tex-comment').value;
  //   comment(currentUser().email, `${data.id}`, currentUser().uid, textComment)
  //     .then(() => {
  //       sectionPost.querySelector('#tex-comment').value = '';
  //     });
  // });

  return sectionPost;
};

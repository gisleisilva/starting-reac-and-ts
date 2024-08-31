
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

interface Author {
  name: string,
  role: string,
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link',
  content: string
}

export interface PostType {
  id: number,
  author: Author,
  publishedAt: Date,
  content: Content[]
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {

  const [newCommentText, setNewCommentText] = useState('');

  const [comments, setComments] = useState([
    'Comentario muito legal!'
  ])

  const dateTitle = format(post.publishedAt, "d LLLL 'ás' HH:mm'h'", {
    locale: ptBR
  });

  const dateView = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  function handleNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment != commentToDelete
    });

    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={dateTitle} dateTime={post.publishedAt.toISOString()} >{dateView}</time>
      </header>

      <div className={styles.content}>
        {post.content.map((line, index) => {
          return line.type == 'paragraph'
            ? <p key={index}>{line.content}</p>
            : line.type == 'link'
              ? <p key={index}><a href="#">{line.content}</a></p>
              : <p key={index}></p>
        })}
      </div>

      <form onSubmit={handleNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          value={newCommentText}
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <button type="submit" disabled={isNewCommentEmpty}>
          Publicar
        </button>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>

    </article>
  );
}
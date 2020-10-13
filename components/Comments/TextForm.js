import { Button, Form, Segment } from 'semantic-ui-react';
import { useRouter } from 'next/router';

export default function CommentForm({
  onSubmit,
  onChange,
  loading,
  user,
  content,
  text,
}) {
  const router = useRouter();
  return (
    <Form reply onSubmit={onSubmit}>
      <Segment loading={loading}>
        <Form.TextArea
          onChange={onChange}
          style={{ height: '3em' }}
          value={text}
        />
        {Object.keys(user).length ? (
          <Button
            content={content}
            labelPosition="left"
            icon="edit"
            primary
            disabled={loading}
            type="submit"
          />
        ) : (
          <Button
            content={'Sign Up To Comment'}
            onClick={() => router.push('/signup')}
            labelPosition="left"
            icon="edit"
            primary
            disabled={loading}
            type="reset"
          />
        )}
      </Segment>
    </Form>
  );
}

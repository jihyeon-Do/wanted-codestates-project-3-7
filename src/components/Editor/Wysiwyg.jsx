import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
const Wysiwyg = ({ index, fields, setFields, width = 388, height = 100 }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorToHtml, setEditorToHTML] = useState(
    draftToHtml(convertToRaw(editorState.getCurrentContent())),
  );

  const htmlToEditor = `초기 값`;
  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      // ContentState를 EditorState기반으로 새 개체를 반환.
      // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
    // 처음 마운트됬을 때만 실행되야 된다.
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(fields[index].description);
  //   const blocksFromHtml = htmlToDraft(fields[index].description);
  //   if (blocksFromHtml) {
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlocks,
  //       entityMap,
  //     );
  //     // ContentState를 EditorState기반으로 새 개체를 반환.
  //     // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
  //     const editorState = EditorState.createWithContent(contentState);
  //     setEditorState(editorState);
  //   }
  //   // 처음 마운트됬을 때만 실행되야 된다.
  //   // eslint-disable-next-line
  // }, [fields[index].description]);

  useEffect(() => {
    setEditorToHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  useEffect(() => {
    setFields(
      fields.map((list, i) => {
        if (list.type === 'agreement') {
          //이용약관일 경우
          if (index === i) {
            return {
              ...list,
              contents: editorToHtml,
            };
          }
        } else {
          if (index === i) {
            return {
              ...list,
              description: editorToHtml,
            };
          }
        }
        return list;
      }),
    );
  }, [editorToHtml]);

  useEffect(() => {
    let blocksFromHtml;
    if (Object.keys(fields[index]).includes('contents')) {
      blocksFromHtml = htmlToDraft(fields[index].contents);
    } else {
      blocksFromHtml = htmlToDraft(fields[index].description);
    }
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      // ContentState를 EditorState기반으로 새 개체를 반환.
      // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [fields]);

  const onEditorStateChange = editorState => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  useEffect(() => {
    // console.log(editorState);
  }, [editorState]);

  return (
    <EditorContainer width={width} height={height}>
      <div dangerouslySetInnerHTML={{ __html: editorToHtml }} />
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbar={{
          inline: { inDropdown: false },
        }}
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
      />
    </EditorContainer>
  );
};

Wysiwyg.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number,
  fields: PropTypes.array,
  setFields: PropTypes.func,
};

const EditorContainer = styled.div`
  .wrapper-class {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin-bottom: 4rem;
  }
  .rdw-inline-wrapper :nth-child(5) {
    display: none;
  }
  .rdw-inline-wrapper :nth-child(6) {
    display: none;
  }
  .rdw-inline-wrapper :nth-child(7) {
    display: none;
  }

  .rdw-option- .rdw-block-wrapper {
    display: none;
  }
  .rdw-fontsize-wrapper {
    display: none;
  }
  .rdw-dropdown-wrapper {
    display: none;
  }
  .rdw-fontfamily-wrapper {
    display: none;
  }
  .rdw-list-wrapper {
    display: none;
  }
  .rdw-text-align-wrapper {
    display: none;
  }

  .rdw-link-wrapper {
    display: none;
  }
  .rdw-embedded-wrapper {
    display: none;
  }
  .rdw-image-wrapper {
    display: none;
  }
  .rdw-remove-wrapper {
    display: none;
  }
  .rdw-image-wrapper {
    display: none;
  }
`;
export default Wysiwyg;

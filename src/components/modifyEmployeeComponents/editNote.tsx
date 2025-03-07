import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    headingsPlugin,
    InsertTable,
    listsPlugin,
    ListsToggle,
    markdownShortcutPlugin,
    MDXEditor,
    MDXEditorMethods,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo
} from '@mdxeditor/editor'
import React, {useState} from "react";
import '@mdxeditor/editor/style.css'
import {useEmployeeData} from "../../state/store.ts";

interface Props {
    tabShow: string;
}

function EditNote({tabShow}: Props) {
    let ref = React.useRef<MDXEditorMethods>(null)
    const note = useEmployeeData.use.note()
    const saveNote = useEmployeeData.use.saveNote()
    const [message, setMessage] = useState('');

    const handleOnChange = () => {
        const timeoutId = setTimeout(() => {
            console.log("inside timer")
            setMessage('Delayed message after 2 seconds!');
        }, 2000);

        console.log("outside timer")

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }


    return (
        <div className={tabShow + " w-[100%]"} id="notes" role="tabpanel" aria-labelledby="notes-tab">
            <form>
                <div className={"text-white flex w-[100%]"}>
                    <div className={"w-[75%]"}>
                        <MDXEditor
                            onChange={() => handleOnChange()}
                            ref={ref}
                            className={"bg-white prose rounded-md editor"}
                            markdown={note.note}
                            plugins={[
                                headingsPlugin(),
                                listsPlugin(),
                                quotePlugin(),
                                thematicBreakPlugin(),
                                markdownShortcutPlugin(),
                                toolbarPlugin({
                                    toolbarClassName: 'my-classname',
                                    toolbarContents: () => (
                                        <>
                                            {' '}
                                            <UndoRedo/>
                                            <BlockTypeSelect/>
                                            <BoldItalicUnderlineToggles/>
                                            <ListsToggle/>
                                            <InsertTable/>
                                        </>
                                    )
                                })
                            ]}
                        />
                    </div>

                    <div className={"pl-2 w-[25%] prose"}>
                        <h3 className={"text-gray-300"}>Help with styling?</h3>
                        <p className={"text-gray-400 text-sm"}>To go from a list to a paragraph or heading you need to select between the two</p>
                    </div>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    ref.current?.setMarkdown('new markdown')
                }}>Set new markdown
                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    saveNote(ref.current?.getMarkdown())
                }}> - Save -
                </button>
                {message}

            </form>
        </div>
    )
}

export default EditNote

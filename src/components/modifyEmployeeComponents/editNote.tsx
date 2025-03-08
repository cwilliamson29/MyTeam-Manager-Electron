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
    let timeout: any;

    const handleOnChange = () => {
        const dateStamp = new Date().toLocaleDateString()
        const timeStamp = new Date().toLocaleTimeString()
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            // Send data to the database here
            saveNote(ref.current?.getMarkdown())
            setMessage("Saved @ " + dateStamp + " " + timeStamp)
        }, 1000); // Adjust the delay time as needed

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
                        <p className={"text-gray-400 text-sm"}>To go from a list to a "block type" fromt he drop down you will need to select between the two on NEW lines.</p>
                        <h3 className={"text-gray-300"}>Saving the note?</h3>
                        <p className={"text-gray-400 text-sm"}>The notes will auto save 1 second after typing stops.</p>
                        <h3 className={"text-gray-300"}>Remove note?</h3>
                        <p className={"text-gray-400 text-sm"}>Select all text and use backspace key to remove.</p>
                    </div>
                </div>
                <div className={"text-gray-400 text-xs pt-1"}>
                    {message}
                </div>
            </form>
        </div>
    )
}

export default EditNote

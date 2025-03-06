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
import React from "react";
import '@mdxeditor/editor/style.css'
import {useEmployeeData} from "../../state/store.ts";

interface Props {
    tabShow: string;
}

function EditNote({tabShow}: Props) {
    const ref = React.useRef<MDXEditorMethods>(null)
    const note = useEmployeeData.use.note()

    return (
        <div className={tabShow + " w-[100%]"} id="notes" role="tabpanel" aria-labelledby="notes-tab">
            <form>
                <div className={"text-white flex w-[100%]"}>
                    <div className={"w-[75%]"}>
                        <MDXEditor
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
                    console.log(ref.current?.getMarkdown())
                }}>Get markdown
                </button>


            </form>
        </div>
    )
}

export default EditNote

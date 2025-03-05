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

interface Props {
    show: string;
    tabShow: string;
    tabHide: string;
}

function EditNote({show, tabShow, tabHide}: Props) {
    const ref = React.useRef<MDXEditorMethods>(null)

    return (
        <div className={show === "notes" ? tabShow + " w-[100%]" : tabHide} id="notes" role="tabpanel" aria-labelledby="notes-tab">
            <form>
                <div className={"text-white flex w-[100%]"}>
                    <div className={"w-[75%]"}>
                        <MDXEditor
                            ref={ref}
                            className={"bg-white prose rounded-md editor"}
                            markdown={'Begin Typing'}
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

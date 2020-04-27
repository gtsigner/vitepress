import MarkdownIt from 'markdown-it'

export const hoistPlugin = (md: MarkdownIt & { __data: any }) => {
  const RE = /^<(script|style)(?=(\s|>|$))/i

  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    const hoistedTags = md.__data.hoistedTags || (md.__data.hoistedTags = [])
    if (RE.test(content.trim())) {
      hoistedTags.push(content)
      return ''
    } else {
      return content
    }
  }
}